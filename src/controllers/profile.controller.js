import path from 'node:path';
import fs from 'fs-extra'
export const getProfile=async(req, res)=>{

    const profileJson= fs.readFileSync(path.join(__dirname, '../config/data.json'), 'utf-8')
    const profileData = JSON.parse(profileJson);
    console.log("🚀 ~ getProfile ~ profileJson:==>", profileJson)

    // res.sendFile(path.join(__dirname, 'src/public/index.html'));

    res.json(profileData).status(200)
}