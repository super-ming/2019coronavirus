import axios from 'axios';

class Utils {
    static async getData(url: string){
        const dataP = await axios.get(url).then(res => {return res}).catch(err => {return err});
        return dataP.data;
    };

    static formatNum(num: number){
        return Intl.NumberFormat().format(num);
    }

    static capitalize(text: string)
    {
        return text.toLowerCase().replace(/\w{3,}/g, (match) =>
        match.replace(/\w/, (m) => m.toUpperCase()));
    }
}

export default Utils;