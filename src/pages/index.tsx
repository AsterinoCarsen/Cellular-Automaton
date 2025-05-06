import Grid from "../comps/Grid";

export default function Home() {
    const cells = [
        [true, false, false, false, false],
        [false, true, false, false, false],
        [false, false, false, false, false],
        [false, false, false, true, false],
        [false, true, false, false, false]
    ];

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Grid cells={cells} size={5} cellSize={50} />
        </div>
    );
}
