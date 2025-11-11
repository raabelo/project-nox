"use client";

import { APP } from "@/utils/global/constants/app.config";
import Button from "../atoms/Button";
import { IconBrandGithub } from "@tabler/icons-react";
import { UI } from "@/utils/global/constants/ui.config";
import Input from "../atoms/Input";
import { useState } from "react";
import { postAddon } from "@/services/addon.service";
import { useMutation } from "@tanstack/react-query";

export default function CreateAddonForm() {
    const [repo, setRepo] = useState("");

    const { mutate, isPending } = useMutation({ mutationKey: ["postAddon"], mutationFn: postAddon });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        mutate({ repositoryUrl: repo, author: { connect: { id: "demo-player" } } });
    }

    return (
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-4 bg-background-light w-96">
            <p>TODO: TEXTO EXPLICANDO COMO FUNCIONA ISSO DE ADDON E PERIODO DE APROVAÇÃO</p>
            <div className="flex flex-row gap-4 items-center">
                <p>see the exemple:</p>
                <Button icon={<IconBrandGithub />} href={APP.REPOSITORY_URL} target="_blank" />
            </div>
            <Input
                required
                name="repo"
                label="Addon Repository on GitHub"
                value={repo}
                type="url"
                onChange={(e) => setRepo(e.target.value)}
            />
            <Button
                type="submit"
                text="Submit to approval"
                color={UI.SECONDARY_COLOR}
                className="mt-4 font-bold"
                isLoading={isPending}
            />
        </form>
    );
}
