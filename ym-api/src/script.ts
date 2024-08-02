const BASE_URL = 'https://api.music.yandex.net:443/'

const setHeaders = (token: string) => {
    return {
        "Accept": "application/json",
        "Authorization": `OAuth: ${token}`,
        "Content-Type": "application/json"
    }
}

class YandexMusicAPI {
    private user = {
        token: '',
        uid: 0
    }

    constructor(token: string, uid: number) {
        this.user.token = token;
        this.user.uid = uid;
    }

    private getData = async (url: string, method: string, body?: any) => {
        return await fetch(`${BASE_URL}${url}`, {
            method: method,
            headers: setHeaders(this.user.token),
        })
    }

    getAccountStatus = async () => {
        const res = await this.getData('/account/status', 'GET');
        if (res.status !== 200) {
            console.error('Ошибка');
        }
        return res
    }
}

const ym = new YandexMusicAPI('y0_AgAAAABDz6EjAAG8XgAAAEKbu4SABWE_InvyxBOJskz6yK8Wf7wTc8bg', 1137680675)

ym.getAccountStatus().then(data => console.log(data));