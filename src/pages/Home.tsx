const Home: React.FC = () => {
    return (
        <>
            <section className="relative size-full bg-background-home bg-cover min-h-svh">
                <div
                    className="bg-gradient-to-b dark:from-black dark:via-black/60 dark:to-black/80 
                from-white via-white/60 to-white/80
                absolute size-full top-0"
                />
                <div className="dark:bg-gray-500/10 bg-gray-500/10 absolute size-full top-0" />

                <div>
                    <p className=" font-bold text-xl">Home</p>
                </div>
            </section>
        </>
    );
};

export default Home;
