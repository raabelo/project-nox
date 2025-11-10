import NewItemCard from "@/components/molecules/NewItemCard";
import CreateAddonForm from "@/components/organisms/CreateAddonForm";
import InnHeader from "@/components/organisms/InnHeader";
import PageWrapper from "@/components/organisms/PageWrapper";

export default async function AddonsPage() {
    return (
        <PageWrapper header={<InnHeader />}>
            <div className="flex flex-col w-full">
                <section id="my-addons-section" className="w-full p-10">
                    <h1 className="text-2xl font-bold mb-4">My Addons</h1>
                    <div className="flex flex-row items-center justify-start gap-4">
                        {/* <GameCard game={gamePlaceholder} /> */}
                        <NewItemCard modalContent={<CreateAddonForm />} />
                    </div>
                </section>
            </div>
        </PageWrapper>
    );
}
