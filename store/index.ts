import { Storage } from "@plasmohq/storage"

export const syncStorage = new Storage({ area: "sync" })

export const localStorage = new Storage({ area: "local" })
