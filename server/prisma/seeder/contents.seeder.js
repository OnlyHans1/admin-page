const { prisma } = require("../../routes/utils/prisma")

const contents = [
    {
        pageId: 1,
        sectionName: "Warisan Leluhur Cirebon",
        context: {
            xs1:{
                label: "Bersama Lestarikan Keraton Tertua di Kota Cirebon",
                textSize: "",
            },
            xi1: `${process.env.BASE_URL}/assets/dashboard/section-1.png`,
            xl1: "https://picsum.photos/200/300"
        }
    },
    {
        pageId: 1,
        sectionName: "Tentang",
        context: {
            xs1:  "Keraton Kesepuham Cirebon",
            xs2: "Pada awai pembangunannya. Keraton Kasepuhan dibangun oleh Pangeran Emas Zainul Arifin dengan maksud untuk memperluas bangunan pesanggerahan Keraton Pangkuwati",
            xi1: `${process.env.BASE_URL}/assets/dashboard/section-2.png`,
        }
    },
    {
        pageId: 1,
        sectionName: "Youtube Video",
        context: {
            xi1: `${process.env.BASE_URL}/assets/dashboard/section-3.png`,
            xl1: "https://picsum.photos/200/300"
        }
    },
]

const contentSeed = async () => {
    const contentLength = await prisma.contents.count()
    if(contentLength > 3) return
    for(let i in contents){
        await prisma.contents.create({ data: {
            ...contents[i],
            sectionOrder: +i
        } })
    }
}

module.exports = { contentSeed }