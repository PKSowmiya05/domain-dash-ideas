
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { getDomainByIdService, Domain as DomainType } from '@/services/projectService';
import { ChevronLeft, Code, Brain, Shield, Smartphone, BarChart, Clock, ArrowUp } from 'lucide-react';

const Domain = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const [domain, setDomain] = useState<DomainType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDomain = async () => {
      if (!domainId) return;
      
      try {
        const data = await getDomainByIdService(domainId);
        if (data) {
          setDomain(data);
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching domain:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDomain();
  }, [domainId, navigate]);
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="h-6 w-6" />;
      case 'brain':
        return <Brain className="h-6 w-6" />;
      case 'shield':
        return <Shield className="h-6 w-6" />;
      case 'smartphone':
        return <Smartphone className="h-6 w-6" />;
      case 'bar-chart':
        return <BarChart className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center group hover:bg-secondary"
            onClick={() => navigate('/dashboard')}
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Domains
          </Button>
          
          {loading ? (
            <>
              <div className="mb-8">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-24 mb-4" />
                      </div>
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            domain && (
              <>
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <div 
                      className="flex items-center justify-center h-14 w-14 rounded-lg mr-4"
                      style={{ backgroundColor: `${domain.color}15` }}
                    >
                      <div className="text-primary">
                        {getIcon(domain.icon)}
                      </div>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">{domain.name}</h1>
                      <p className="text-muted-foreground">
                        {domain.projects.length} project{domain.projects.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg">{domain.description}</p>
                </div>
                
                <div className="divide-y">
                  {domain.projects.map((project) => (
                    <Card 
                      key={project.id}
                      className="p-6 hover:bg-secondary/20 cursor-pointer mb-4 transition-colors"
                      onClick={() => navigate(`/domain/${domain.id}/project/${project.id}`)}
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          
                          <div className="flex items-center mb-4 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{project.timeEstimate}</span>
                          </div>
                          
                          <p className="line-clamp-3 text-muted-foreground mb-4">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge className={getDifficultyColor(project.difficulty)}>
                              {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                            </Badge>
                            
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                            {project.tags.length > 3 && (
                              <Badge variant="outline">+{project.tags.length - 3}</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex md:flex-col gap-2">
                          {project.sourceLink && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.sourceLink, '_blank');
                              }}
                            >
                              View Source
                            </Button>
                          )}
                          <Button 
                            size="sm"
                            className="text-xs"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="fixed bottom-8 right-8 bg-white shadow-md rounded-full h-10 w-10 hidden md:flex items-center justify-center"
                  onClick={scrollToTop}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Domain;
