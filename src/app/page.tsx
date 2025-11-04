import HeroButton from "@/components/atoms/HeroButton";
import HeroTitle from "@/components/atoms/HeroTitle";
import Header from "@/components/molecules/Header";
import UsersCounter from "@/components/molecules/UsersCounter";
import PageWrapper from "@/components/organisms/PageWrapper";

export default function Home() {
    return (
        <PageWrapper>
            <header id="header" className="w-full">
                <Header />
            </header>

            <section id="hero-section" className="w-full">
                <div className="flex flex-col items-center gap-6">
                    <HeroTitle />
                    <h2>The AI-Powered RPG for You and 5 Friends</h2>
                    <h3>
                        D&D inspired. No DM required. Create any character. Play anytime. Try it for
                        free.
                    </h3>
                    {/* <HeroButton /> */}
                    <div className="flex flex-row items-center gap-2">
                        <p>Join other</p>
                        <UsersCounter />
                        <p>adventures</p>
                    </div>
                </div>
            </section>

            <section id="pictures">
                <div className="flex flex-col items-center gap-6">
                    <h1>Be Anyone. Do Anything.</h1>
                    <div></div>
                    <p></p>
                </div>
            </section>

            <section id="feedbacks">{/* Depoimentos, avaliações ou reviews */}</section>

            <section id="demo">{/* Demonstração do produto ou serviço */}</section>

            <section id="features">{/* Principais funcionalidades ou diferenciais */}</section>

            <section id="cta">{/* Call to action, como formulário ou botão */}</section>

            <footer id="footer">{/* Informações de rodapé, links de contato, copyright */}</footer>
        </PageWrapper>
    );
}
