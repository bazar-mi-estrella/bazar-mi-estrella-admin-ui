export class DateFormatUtil {

    static start(date: any) {
        if (!date) date = new Date()

        if (date._i) {
            const date1 = date._d;
            return `${date1.getFullYear()}-${('0' + (date1.getMonth() + 1)).slice(-2)}-${(
                '0' + date1.getDate()
            ).slice(-2)} 00:00:00`;

        } else return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
            '0' + date.getDate()
        ).slice(-2)} 00:00:00`;

    }



    static end(date: any) {
        if (!date) date = new Date()
        if (date._i) {
            const date1 = date._d;
            return `${date1.getFullYear()}-${('0' + (date1.getMonth() + 1)).slice(-2)}-${(
                '0' + date1.getDate()
            ).slice(-2)} 23:59:59`;

        } else return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
            '0' + date.getDate()
        ).slice(-2)} 23:59:59`;

    }

}