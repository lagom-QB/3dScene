import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { request } from 'graphql-request';

import Project from './Projects';

/* TODO: DesignProjectGetter
    - Get the design project from the hygraphCMS
    - Return the data
*/

function ProjectsGetter() {
  const [projects, setProjects] = React.useState(null);

  React.useEffect(() => {
    const fetchProjects = async () => {

      const { projects } = await request(
        `https://eu-central-1.cdn.hygraph.com/content/cl39zv7no07cu01z2gjet3ce5/master`,
        `
        {
          projects {
            id
            link
            name
            tags
            description
          }
        }
        `
      );
      setProjects(projects);
    }

    fetchProjects();
  }, []);

  if (projects === null) {
    return <>Loading...</>;
  }
  return (
    <Router>
      {!projects ? 'Loading...' : (
        <>
          <ul>
            {projects
              .filter((project) => project.tags.includes('design') || project.tags.includes('processing'))
              .map(({ id, link, name, tags, description }) => {
                return (
                  <li key={id}>
                    <Link reloadDocument to={link}>{name}</Link><br />
                    <div>{description}</div>
                    {/* {console.log(tags)} */}
                    {tags.map((tag, index) => (
                      <span key={index}>{tag} </span>
                    ))}
                  </li>
                );
              })}
          </ul>
          <ul>
            {projects
              .filter((project) => !project.tags.includes('design') && !project.tags.includes('processing'))
              .map(({ id, link, name, tags, description }) => (
                <li key={id}>
                  <Link reloadDocument to={link}>{name}</Link><br />
                  <div>{description}</div>
                  {/* {console.log(tags)} */}
                  {tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </li>
              ))}
          </ul>
          <Routes>
            <Route path="/projects/:name" element={<Project projects={projects} />} />
          </Routes>
        </>
      )}
    </Router>
  )
}

export default ProjectsGetter;

/**
 * <ul>
    projects.filter((project) => project.tags
                                        .includes('design') 
                              || project.tags
                                        .includes('processing'))
            .map(({id, link, name, tags, description}) => (
      <li key={id}>
        <Link to={`/projects/${name}`}>{name}</Link>
      </li>
      ))}
  </ul>
  <ul>
      {projects.filter((project) => !project.tags
                      .includes('design')
            && !project.tags
                      .includes('processing'))
      .map(({id, link, name, tags, description}) => (
      <li key={id}>
      <Link to={`/projects/${name}`}>{name}</Link>
      </li>
      ))}
      </ul>
 */