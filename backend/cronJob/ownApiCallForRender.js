const { CronJob } = require("cron");


const fetchApi = async()=>{
    try {
        const data = await fetch(process.env.API_URL,{
            method: "GET",
        });
        console.log(await data.text());
    } catch (error) {
        console.log(error);
    }
}

const ownApiCallForRender = () => {
    new CronJob(
        '*/5 * * * *',
        function () {
            fetchApi();
        },
        null,
        true,
        'Asia/Kolkata'
    );
}
module.exports = { ownApiCallForRender }