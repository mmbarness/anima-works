import { match } from "ts-pattern";

export const appContainer = {
    useStyle: (orientation: "portrait" | "landscape") => (
        match(orientation)
            .with("landscape", () => appContainer.landscape)
            .with("portrait", () => appContainer.portrait)
            .run()
    ),
    landscape: (params: {navBarHeight:string}) => ({
        margin: "auto",
        display: "grid",
        gridTemplateAreas: `
            'nav'
            'main'
            'footer'
        `,
        gridRowGap: "1rem",
        gridTemplateRows: `${params.navBarHeight} auto 10vh`,
        fontFamily: "Lora, serif",
        caretColor: "transparent",
        height: "100vh",
    }),
    portrait: () => ({
        margin: "auto",
        display: "grid",
        gridRowGap: "1.5rem",
        gridTemplateAreas: `
            'nav'
            'main'
            'footer'
        `,
        fontFamily: "Lora, serif",
        caretColor: "transparent",
    })
}