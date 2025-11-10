import GameCard from "@/components/molecules/GameCard";
import NewItemCard from "@/components/molecules/NewItemCard";
import CreateGameForm from "@/components/organisms/CreateGameForm";
import InnHeader from "@/components/organisms/InnHeader";
import PageWrapper from "@/components/organisms/PageWrapper";

const gamePlaceholder = {
    id: "sadqwe",
    title: "The Grand Society of Us",
    thumbnail: "https://i.pinimg.com/1200x/b5/e7/9e/b5e79ed06f7120b11958d4df6e8336a8.jpg",
    description: "barraca doa",
    backgroundStory: "asdqwe",
    shortTermSummary: "asdq",
    longTermSummary: "asdq",
    summaryUpdatedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    isPrivate: false,
};

export default function InnPage() {
    return (
        <PageWrapper header={<InnHeader />}>
            <div className="flex flex-col w-full">
                <section id="my-games-section" className="w-full p-10">
                    <h1 className="p-4">Games</h1>
                    <div className="flex flex-row items-center justify-start gap-4">
                        <GameCard game={gamePlaceholder} />
                        <NewItemCard modalContent={<CreateGameForm />} />
                    </div>
                </section>
                <section id="community-section" className="w-full"></section>
            </div>
        </PageWrapper>
    );
}
