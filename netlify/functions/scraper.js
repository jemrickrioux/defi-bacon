const axios = require('axios'),
    cheerio = require("cheerio");
const { schedule } = require('@netlify/functions')


const { PrismaClient } =require("@prisma/client");
const prisma = new PrismaClient();
const getAmount = async (url) => {
    const data = await axios.get(url)
    const $ = cheerio.load(data.data)
    const amount = $(".m-progress-meter-heading").text().split(" ")[0];
    const value = amount.includes("$") ? amount.split("$") : amount;
    return parseInt(value[1].replace(",",""))
}

const handler = async (event, context) => {
    const amount = await getAmount("https://www.gofundme.com/f/gofundme-en-la-mmoire-de-mon-frre-maxime?qid=ebd1a3895ff5966bc933b363abac173c");
    //do something
    if(amount){
        const update = await prisma.goal.update({
            where: {
                id: 1
            },
            data: {
                distance: parseFloat(amount/10)
            }
        })
        return { statusCode: 200 }
    } else {
        return { statusCode: 400 }
    }
}

exports.handler = schedule('@hourly', handler)
