import { openai, supabase } from './config.js'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

async function ok(input) {
    let data = await Promise.all(
        input.map(async (text) => {
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: text.pageContent
            });

            return {
                content: text.pageContent,
                embedding: embeddingResponse.data[0].embedding
            };
        })
    );
    const {error} = await supabase.from('movies').insert(data);
    if(error)
    { throw Error("data has not entered due to"+error)}
    else
    console.log("Data entered!!!")
}

async function splitInput() {
    const response = await fetch('./movies.txt')
    const text = await response.text()
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 150,
        chunkOverlap: 10,
        separators: ["\n\n", "\n", " ", ""],
    })
    const output = await splitter.createDocuments([text])
    // console.log(output)
    ok(output)
}
splitInput()