import axios from 'axios';

class Utils {
    static getData(){
        const data = axios.get('http://localhost:5000')
    };

    static formatNum(num){
        return Intl.NumberFormat().format(num);
    }

    static capitalize(text)
    {
        return text.toLowerCase().replace(/\w{3,}/g, (match) =>
        match.replace(/\w/, (m) => m.toUpperCase()));
    }
}

export default Utils;