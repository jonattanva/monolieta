import type { Project } from "../templates/project/new";

export async function create(project: Project): Promise<string> {
    try {
        const response = await fetch(`/api/project`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: project.name,
                description: project.description,
                privacy: project.privacy,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}
