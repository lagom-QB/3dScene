import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Project({ projects }){
    const { name } = useParams();
    
    // console.log(`name: ${name}`);

    const project = projects.find((project) => project.name === name);

    return (
        <div>
            <h1>
                <Link to={project.link}>{project.name}</Link>
            </h1>
        </div>
    );
}

export default Project;