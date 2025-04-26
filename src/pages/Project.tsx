
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getDomainByIdService, getProjectByIdService, Domain, ProjectIdea } from '@/services/projectService';
import { ChevronLeft, Clock, ExternalLink, Code } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Project = () => {
  const { domainId, projectId } = useParams<{ domainId: string; projectId: string }>();
  const [domain, setDomain] = useState<Domain | null>(null);
  const [project, setProject] = useState<ProjectIdea | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!domainId || !projectId) return;
      
      try {
        const [domainData, projectData] = await Promise.all([
          getDomainByIdService(domainId),
          getProjectByIdService(domainId, projectId),
        ]);
        
        if (domainData) {
          setDomain(domainData);
        }
        
        if (projectData) {
          setProject(projectData);
        } else {
          navigate(`/domain/${domainId}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [domainId, projectId, navigate]);
  
  const handleCopyCode = () => {
    if (project?.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      toast({
        title: "Code copied!",
        description: "The code snippet has been copied to your clipboard.",
      });
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center group hover:bg-secondary"
            onClick={() => navigate(`/domain/${domainId}`)}
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to {domain?.name || 'Projects'}
          </Button>
          
          {loading ? (
            <div className="space-y-8">
              <div>
                <Skeleton className="h-10 w-3/4 mb-4" />
                <div className="flex space-x-2 mb-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-[200px] w-full rounded-md" />
              </div>
            </div>
          ) : (
            project && domain && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge className={getDifficultyColor(project.difficulty)}>
                      {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                    </Badge>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{project.timeEstimate}</span>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-muted-foreground mb-6">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {project.sourceLink && (
                    <Button 
                      variant="outline"
                      onClick={() => window.open(project.sourceLink, '_blank')}
                      className="mb-8"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Source Code
                    </Button>
                  )}
                  
                  {project.codeSnippet && (
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">Code Snippet</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleCopyCode}
                          className="text-xs"
                        >
                          Copy Code
                        </Button>
                      </div>
                      <div className="code-block">
                        <pre className="whitespace-pre-wrap break-all">
                          {project.codeSnippet}
                        </pre>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        This is a sample code snippet to help you get started.
                      </p>
                    </div>
                  )}
                  
                  <Card className="bg-secondary/50 border-none p-6">
                    <div className="flex items-start gap-4">
                      <div 
                        className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full"
                        style={{ backgroundColor: `${domain.color}15` }}
                      >
                        <Code className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Ready to start coding?</h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Dive into the project! Remember that the best way to learn is by building. 
                          Don't be afraid to customize and make this project your own.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="py-4 border-t">
                  <h2 className="font-semibold mb-4">Other projects in {domain.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {domain.projects
                      .filter(p => p.id !== project.id)
                      .slice(0, 2)
                      .map((otherProject) => (
                        <Card 
                          key={otherProject.id}
                          className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                          onClick={() => navigate(`/domain/${domain.id}/project/${otherProject.id}`)}
                        >
                          <h3 className="font-medium mb-1">{otherProject.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {otherProject.description}
                          </p>
                        </Card>
                      ))}
                  </div>
                  
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/domain/${domain.id}`)}
                    >
                      View All {domain.name} Projects
                    </Button>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Project;
