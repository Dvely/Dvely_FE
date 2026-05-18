import ProjectCard from './ProjectCard';
import { DEMO_PROJECTS } from '@/mocks/projects/projectTypes';

function ProjectsView() {
  return (
    <section className="flex-1 overflow-y-auto px-7 pb-10 pt-0">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {DEMO_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default ProjectsView;
