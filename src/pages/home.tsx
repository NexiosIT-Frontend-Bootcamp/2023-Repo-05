import GuardWrapper from "../wrappers/GuardWrapper";
import HomeComponent from "../components/HomeComponent";

const Home = () => {
    return (
        <>
            <GuardWrapper>
                <HomeComponent></HomeComponent>
            </GuardWrapper>
        </>
    )
}

export default Home;
