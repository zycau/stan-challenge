import React from 'react'
import { render, fireEvent, waitFor, cleanup, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom'

import {App} from '../ui/App'

describe('Testing with fake data', () => {
    let initialFetch
    beforeEach(() => {
        initialFetch = global.fetch
    })
    afterEach(() => {
        global.fetch = initialFetch
        cleanup()
    })

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeData),
        })
    )

    it('Home page should show loading then carousels', async () => {
        await act(async () => {
            render(
                <App />
            )
        })

        expect(global.fetch).toBeCalledTimes(1)

        await waitFor(() => {
            expect(screen.getByTestId('home-loading')).toBeInTheDocument()
        })

        await waitFor(() => {
            expect(screen.getByTestId('item0')).toBeInTheDocument()
        })
    
        expect(screen.getByTestId('img0')).toBeInTheDocument()
    })

    it('No more than 6 carousels on home page', async () => {
        await act(async () => {
            render(
                <App />
            )
        })

        await waitFor(() => {
            expect(screen.getByAltText('The Wedding Singer')).toBeInTheDocument()
        })

        expect(screen.queryByAltText('The Bold Type')).not.toBeInTheDocument()

        for(let i=0; i<6; i++){
            fireEvent.keyDown(window, {key: 'ArrowRight'})
        }
        
        expect(screen.getByAltText('The Bold Type')).toBeInTheDocument()
        expect(screen.queryByAltText('The Wedding Singer')).not.toBeInTheDocument()
    })

    it('No more than 6 carousels on home page', async () => {
        await act(async () => {
            render(
                <App />
            )
        })

        await waitFor(() => {
            expect(screen.getByAltText('The Wedding Singer')).toBeInTheDocument()
        })

        expect(screen.queryByAltText('The Bold Type')).not.toBeInTheDocument()

        for(let i=0; i<5; i++){
            fireEvent.keyDown(window, {key: 'ArrowRight'})
        }
        
        expect(screen.getByAltText('The Bold Type')).toBeInTheDocument()
        expect(screen.queryByAltText('The Wedding Singer')).not.toBeInTheDocument()
        
        for(let i=0; i<5; i++){
            fireEvent.keyDown(window, {key: 'ArrowLeft'})
        }        
        expect(screen.queryByAltText('The Bold Type')).not.toBeInTheDocument()
        expect(screen.getByAltText('The Wedding Singer')).toBeInTheDocument()
    })

    it('Press enter or backspace to navigate', async () => {
        await act(async () => {
            render(
                <App />
            )
        })

        await waitFor(() => {
            expect(screen.getByTestId('item0')).toBeInTheDocument()
        })
        
        fireEvent.keyDown(window, {key: 'Enter'})
        expect(screen.getByTestId('program')).toBeInTheDocument()
        expect(screen.queryByTestId('home')).not.toBeInTheDocument()

        fireEvent.keyDown(window, {key: 'Backspace'})
        expect(screen.getByTestId('home')).toBeInTheDocument()
        expect(screen.queryByTestId('program')).not.toBeInTheDocument()
    })    
})

const fakeData = [
    {
        "id": 3028280,
        "title": "The Wedding Singer",
        "description": "Robbie, a wedding singer, meets Julia, a waitress, at a reception and the two hit it off. When Robbie learns that Julia is engaged to another man, who treats her poorly, he has to pull off the performance of his life to win the girl of his dreams.",
        "type": "movie",
        "image": "https://streamcoimg-a.akamaihd.net/000/302/8280/3028280-PosterArt-162b2fbc055243013eff73aae0f4de72.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg",
        "rating": "M",
        "genre": "Comedy",
        "year": 1998,
        "language": "English"
    },
    {
        "id": 26421,
        "title": "All American",
        "description": "When a rising high school football player from South Central L.A. is recruited to play for Beverly Hills High, two families from vastly different worlds begin to collide.",
        "type": "series",
        "image": "https://streamcoimg-a.akamaihd.net/000/264/21/26421-PosterArt-21077e57c8e85b842997cea8deb3a8f1.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg",
        "rating": "M",
        "genre": "Drama",
        "year": 2018,
        "language": "English"
    },
    {
        "id": 68148,
        "title": "Beyond Appearances",
        "description": "Alexandra's twin-sister Mamon disappears on the eve of their birthday. The whole family starts an investigation, but every member has their own secret. (French with English subtitles).",
        "type": "series",
        "image": "https://streamcoimg-a.akamaihd.net/000/681/48/68148-PosterArt-935533a8435c3700a4354752577718f0.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg",
        "rating": "MA 15+",
        "genre": "Crime",
        "year": 2019,
        "language": "French"
    },
    {
        "id": 3019355,
        "title": "Halloween II (1981)",
        "description": "WARNING: CONTAINS HIGH IMPACT VIOLENCE. While Sheriff Brackett and Dr. Loomis hunt for Michael Myers, a traumatised Laurie is rushed to hospital, and the serial killer is not far behind her.",
        "type": "movie",
        "image": "https://streamcoimg-a.akamaihd.net/000/301/9355/3019355-PosterArt-b99bca2ca0ef972600e4ab7cb414a228.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg",
        "rating": "R 18+",
        "genre": "Horror",
        "year": 1981,
        "language": "English"
    },
    {
        "id": 67663,
        "title": "Sins of the City",
        "description": "When a murder takes place, how does a city’s character change? This series exposes the dark underbelly of cities, highlighting the mysterious crimes that changed the communities there forever.",
        "type": "series",
        "image": "https://streamcoimg-a.akamaihd.net/000/676/63/67663-PosterArt-5fa8f418534239af025e67ac5ecc2aec.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg",
        "rating": "M",
        "genre": "Documentary",
        "year": 2021,
        "language": "English"
    },
    {
        "id": 3028281,
        "title": "You've Got Mail",
        "description": "Book superstore magnate, Joe, and independent book shop owner, Kathleen, fall in love in the anonymity of the internet — both blissfully unaware that he's trying to put her out of business.",
        "type": "movie",
        "image": "https://streamcoimg-a.akamaihd.net/000/302/8281/3028281-PosterArt-27c7bf01c3e72dcf70b934bc06e7e29d.jpeg",
        "rating": "PG",
        "genre": "Romance",
        "year": 1998,
        "language": "English"
    },
    {
        "id": 26895,
        "title": "The Bold Type",
        "description": "THE BOLD TYPE follows three spirited, modern young women who work for 'Scarlet', a global women's magazine based in New York City.",
        "type": "series",
        "image": "https://streamcoimg-a.akamaihd.net/000/268/95/26895-PosterArt-b64690765414cbb82c81323f63b3588e.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg",
        "rating": "M",
        "genre": "Drama",
        "year": 2017,
        "language": "English"
    },
    {
        "id": 1000510,
        "title": "Persepolis",
        "description": "A poignant coming-of-age story of a precocious and outspoken young Iranian girl's life in pre- and post-revolutionary Iran, and then Europe. Based on director Marjane Satrapi's autobiographical graphic novel.",
        "type": "movie",
        "image": "https://streamcoimg-a.akamaihd.net/000/100/0510/1000510-PosterArt-2d486d69504682f2961f0493833a0334.jpg?resize=512px:*&quality=75&preferredFormat=image/jpeg",
        "rating": "M",
        "genre": "Animation",
        "year": 2006,
        "language": "Iranian"
    }
]


