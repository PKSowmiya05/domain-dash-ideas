
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getDomainsService, Domain } from '@/services/projectService';
import { Code, Brain, Shield, Smartphone, BarChart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const data = await getDomainsService();
        setDomains(data);
      } catch (error) {
        console.error('Error fetching domains:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDomains();
  }, []);
  
  const filteredDomains = domains.filter(domain => 
    domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Project Ideas</h1>
            <p className="text-lg text-muted-foreground">
              Explore different domains and find your next coding project
            </p>
          </div>
          
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="domain-card">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div className="ml-4 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredDomains.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No domains found matching "{searchTerm}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDomains.map((domain) => (
                    <Card 
                      key={domain.id} 
                      className="domain-card group cursor-pointer hover:scale-[1.01] transition-all"
                      onClick={() => navigate(`/domain/${domain.id}`)}
                      style={{ '--domain-color': domain.color } as React.CSSProperties}
                    >
                      <div className="flex items-center mb-4">
                        <div 
                          className="flex items-center justify-center h-12 w-12 rounded-md"
                          style={{ backgroundColor: `${domain.color}15` }}
                        >
                          <div className="text-primary">
                            {getIcon(domain.icon)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-bold text-lg">{domain.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {domain.projects.length} project{domain.projects.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {domain.description}
                      </p>
                      <div className="flex items-center text-xs font-medium">
                        <span className="text-primary group-hover:underline">
                          Explore Projects
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
