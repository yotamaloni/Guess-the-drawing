import { useState } from "react";
import { StartForm } from "../cmps/start-form";

export const AppHome = () => {

    const [isFormOpen, setIsFormOpen] = useState(false)

    const onToggleForm = () => {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <section className="app-home">
            <p>
                Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
                Incidunt laboriosam unde, alias
                enim qui ipsum, non consequuntur
                deserunt voluptatum assumenda,
                beatae labore ad explicabo pariatur
                voluptatibus cumque ullam nemo facere.
            </p>
            <div className="actions">
                <button onClick={onToggleForm} className="done">Start</button>
            </div>
            {isFormOpen && <StartForm />}
        </section>
    )
} 