export interface ITrack {
  id: number
  title: string
  link: string
  duration: number
  preview: string
  artist: {
    id: number
    name: string
    link: string
    picture: string
    picture_big: string
  }
  album: {
    id: number
    title: string
    cover: string
    cover_big: string
  }
}
