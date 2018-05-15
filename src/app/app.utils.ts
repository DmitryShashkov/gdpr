export class AppUtils {
    public static async sleep (timeout: number) : Promise<void> {
        return new Promise<void>((resolve) => setTimeout(resolve, timeout));
    }

    public static buildTwitterShareLink (options: { [key: string]: string }) : string {
        const PARAMS_MAP = {
            'text': 'text',
            'url': 'url',
            'hashTags': 'hashtags',
            'via': 'via',
            'related': 'related',
            'inReplyTo': 'in-reply-to'
        };

        let params: string[] = [];
        let url: string = 'https://twitter.com/intent/tweet?';

        for (let field in PARAMS_MAP) {
            if (options[field]) {
                params.push(`${PARAMS_MAP[field]}=${encodeURIComponent(options[field])}`);
            }
        }

        return url + params.join('&');
    }
}
