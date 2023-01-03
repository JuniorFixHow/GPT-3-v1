import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey:'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'
})

const openai = new OpenAIApi(configuration)

export const postRequest = async(req, res)=>{
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model:'text-davinci-003',
            prompt:`${prompt}`,
            temperature:0,
            max_tokens:3000,
            top_p:1,
            frequency_penalty:0.5,
            presence_penalty:0
        })

        res.status(200).send({
            bot:response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
}

export const getRequests = async(req, res)=>{
    res.status(200).send({
        message:'Tried and tested'
    })
}