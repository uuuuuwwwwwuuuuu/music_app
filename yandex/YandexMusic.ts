import { GetAccountStatusResponse, GetFeedResponse, GetGenresResponse, LikedTracks, SearchOptions } from "./types";


export default class YM {
    private user = {
        token: '',
        uid: 0
    }

    private URL = 'https://api.music.yandex.net:443';

    constructor(token: string, uid: number) {
        this.user.token = token;
        this.user.uid = uid;
    }

    private getData = async (currentUrl: string, method: string = 'GET', body?: any) => {
        try {
            const res = await fetch(`${this.URL}${currentUrl}`, {
                method: method,
                headers: this.setHeaders(),
                body: body
            });
            const subData = await res.json();
            return subData.result
        } catch (error) {
            if (error) {
                const err = error as Error;
                console.error(err.message)
            }
        }
    }

    private setHeaders = () => {
        return {
            'Accept': 'application/json',
            'Authorization': `OAuth: ${this.user.token}`,
            'Content-Type': 'application/json'
        }
    }

    getLikedTracks = async () => {
        return await this.getData(`/users/${this.user.uid}/likes/tracks`) as Promise<LikedTracks>
    }

    getAccountStatus = async () => {
        return await this.getData('/account/status') as Promise<GetAccountStatusResponse>
    }

    getFeed = async () => {
        return await this.getData('/feed') as Promise<GetFeedResponse>
    }

    getGenres = async () => {
        return await this.getData('/genres') as Promise<GetGenresResponse>
    }


    //query здесь играет роль части ссылки
    search = async (query: string, options: SearchOptions = {}) => {
        const type = !options.type ? "all" : options.type;
        const page = String(!options.page ? 0 : options.page);
        const nococrrect = String(
            options.nococrrect == null ? false : options.nococrrect
        );

        if (options.pageSize !== 0) {
            return this.getData('/search', 'GET', {
                type,
                text: query,
                page,
                nococrrect,
                pageSize: String(options.pageSize)
            })
        } else {
            return this.getData('/search', 'GET', {
                type,
                text: query,
                page,
                nococrrect
            })

        }

    }
}
