import { getApi } from '@/api/server/index';
import { makeAutoObservable, runInAction } from "mobx"

class Store {

    inited = false

    test1: string = ''

    arr: number[] = []

    constructor() {
        makeAutoObservable(this)
    }

    init = async () => {
        try {
            const { data: { test1,arr }, code, message } = await getApi.testApi({ test: 1 })

            runInAction(() => {
                this.test1 = test1
                this.arr = arr
                this.inited = true
            })
            console.log(test1, 'inited');
        } catch (e) {
            console.log(e);
        }
    }
}

let store = new Store()
function resetStore() {
    return store = new Store()
}

export { store, resetStore }