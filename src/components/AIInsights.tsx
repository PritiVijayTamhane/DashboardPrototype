import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Clock,
  MapPin,
  Eye,
  Users,
  Activity
} from 'lucide-react';

interface AIInsightsProps {
  onBack: () => void;
}

export function AIInsights({ onBack }: AIInsightsProps) {
  const anomalies = [
    {
      id: '1',
      type: 'inactivity',
      tourist: 'Maria Rodriguez',
      tripId: 'TRIP-01245',
      description: 'Prolonged inactivity detected (12 hrs)',
      location: 'Hotel Polo Towers, Shillong',
      severity: 'high',
      confidence: 92,
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'deviation',
      tourist: 'Liu Wei',
      tripId: 'TRIP-00125',
      description: 'Route deviation: 8km from planned path',
      location: 'Near Cherrapunji, Meghalaya',
      severity: 'medium',
      confidence: 87,
      time: '30 minutes ago'
    },
    {
      id: '3',
      type: 'pattern',
      tourist: 'David Chen',
      tripId: 'TRIP-01246',
      description: 'Unusual movement pattern detected',
      location: 'Tawang Monastery, Arunachal Pradesh',
      severity: 'low',
      confidence: 76,
      time: '1 hour ago'
    },
    {
      id: '4',
      type: 'clustering',
      tourist: 'Multiple',
      tripId: 'Various',
      description: 'Tourist clustering in restricted zone',
      location: 'Kaziranga Core Area, Assam',
      severity: 'medium',
      confidence: 89,
      time: '45 minutes ago'
    }
  ];

  const predictions = [
    {
      id: '1',
      type: 'risk',
      title: 'High Risk of Incident Predicted',
      description: 'Kaziranga Buffer Zone shows elevated risk today',
      probability: 78,
      timeframe: 'Next 6 hours',
      factors: ['Monsoon weather', 'Animal movement', 'Historical data']
    },
    {
      id: '2',
      type: 'congestion',
      title: 'Tourist Congestion Expected',
      description: 'Tawang Monastery likely to be overcrowded',
      probability: 85,
      timeframe: 'Next 3 hours',
      factors: ['Festival season', 'Clear weather', 'Weekend']
    },
    {
      id: '3',
      type: 'safety',
      title: 'Optimal Safety Window',
      description: 'Shillong Peak safest for visits',
      probability: 92,
      timeframe: 'Current',
      factors: ['Low tourist density', 'Good visibility', 'Patrol presence']
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inactivity': return <Clock className="w-4 h-4" />;
      case 'deviation': return <MapPin className="w-4 h-4" />;
      case 'pattern': return <Activity className="w-4 h-4" />;
      case 'clustering': return <Users className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            AI Insights & Anomaly Detection
          </h1>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          AI Engine Active
        </Badge>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Anomaly Detection */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Detected Anomalies
                </CardTitle>
                <CardDescription>
                  AI-powered behavioral and pattern analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {anomalies.map((anomaly) => (
                  <Alert key={anomaly.id} className={getSeverityColor(anomaly.severity)}>
                    {getTypeIcon(anomaly.type)}
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{anomaly.tourist}</span>
                          <Badge variant="outline" className="text-xs">
                            {anomaly.confidence}% confidence
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">{anomaly.description}</div>
                          <div className="text-muted-foreground mt-1">
                            Trip ID: {anomaly.tripId} • {anomaly.location}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {anomaly.time}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View on Map
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Predictive Analytics */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Predictive Analytics
                </CardTitle>
                <CardDescription>
                  AI forecasts and risk predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictions.map((prediction) => (
                  <Card key={prediction.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{prediction.title}</h4>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {prediction.probability}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Probability
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {prediction.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Timeframe:</span>
                          <span className="font-medium">{prediction.timeframe}</span>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm font-medium">Key Factors:</div>
                          <div className="flex flex-wrap gap-1">
                            {prediction.factors.map((factor, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Model Performance */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Performance & Statistics</CardTitle>
              <CardDescription>
                Real-time performance metrics of the AI detection system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                  <div className="text-sm text-muted-foreground">Detection Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">847</div>
                  <div className="text-sm text-muted-foreground">Patterns Analyzed Today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">23</div>
                  <div className="text-sm text-muted-foreground">Alerts Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2.3s</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Detection Categories</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Inactivity Detection</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div className="w-3/4 h-full bg-green-500 rounded-full" />
                        </div>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Route Deviation</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div className="w-4/5 h-full bg-blue-500 rounded-full" />
                        </div>
                        <span className="text-sm font-medium">91%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Behavioral Patterns</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div className="w-4/5 h-full bg-purple-500 rounded-full" />
                        </div>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Recent Model Updates</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Risk Assessment Model v2.1</span>
                      <span className="text-muted-foreground">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pattern Recognition Engine</span>
                      <span className="text-muted-foreground">1 week ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Anomaly Detection Core</span>
                      <span className="text-muted-foreground">2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}