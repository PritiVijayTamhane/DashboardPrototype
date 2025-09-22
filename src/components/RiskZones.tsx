import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Users,
  Calendar,
  Activity,
  Thermometer
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import neIndiaMap from 'figma:asset/711b37be16cea09cb3892059da8d795ba928081a.png';

interface RiskZonesProps {
  onBack: () => void;
}

export function RiskZones({ onBack }: RiskZonesProps) {
  const riskZones = [
    {
      id: '1',
      name: 'Kaziranga Core Area, Assam',
      level: 'high',
      touristCount: 23,
      incidents: 3,
      factors: ['Wildlife encounters', 'Restricted access zones', 'Weather dependent'],
      recommendation: 'Deploy forest patrol units'
    },
    {
      id: '2',
      name: 'Tawang Border Region, Arunachal Pradesh',
      level: 'medium',
      touristCount: 45,
      incidents: 1,
      factors: ['High altitude', 'Weather changes', 'Remote location'],
      recommendation: 'Increase medical support'
    },
    {
      id: '3',
      name: 'Cherrapunji Hills, Meghalaya',
      level: 'medium',
      touristCount: 89,
      incidents: 2,
      factors: ['Heavy rainfall', 'Steep terrain', 'Landslide risk'],
      recommendation: 'Weather-based monitoring'
    },
    {
      id: '4',
      name: 'Loktak Lake, Manipur',
      level: 'low',
      touristCount: 12,
      incidents: 0,
      factors: ['Water activities', 'Boat transportation'],
      recommendation: 'Standard water safety monitoring'
    }
  ];

  const heatmapData = [
    { area: 'Guwahati Central, Assam', density: 85, risk: 'high' },
    { area: 'Shillong Hills, Meghalaya', density: 62, risk: 'medium' },
    { area: 'Tezpur Valley, Assam', density: 34, risk: 'low' },
    { area: 'Kohima Town, Nagaland', density: 28, risk: 'low' },
    { area: 'Agartala Border, Tripura', density: 15, risk: 'low' }
  ];

  const predictions = [
    {
      time: '2:00 PM',
      area: 'Kaziranga National Park',
      prediction: 'High Risk',
      confidence: 78,
      description: 'Elevated incident probability due to monsoon and wildlife activity'
    },
    {
      time: '4:00 PM',
      area: 'Tawang Monastery',
      prediction: 'Moderate Risk',
      confidence: 65,
      description: 'Altitude and weather changes may impact tourist safety'
    },
    {
      time: '6:00 PM',
      area: 'Shillong Peak',
      prediction: 'Low Risk',
      confidence: 89,
      description: 'Optimal conditions for tourist activities'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDensityColor = (density: number) => {
    if (density >= 70) return 'bg-red-500';
    if (density >= 40) return 'bg-orange-500';
    return 'bg-green-500';
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
            <MapPin className="w-8 h-8 text-red-600" />
            Risk Zones & Heatmap Analysis
          </h1>
        </div>
        <Badge variant="outline" className="bg-red-50 text-red-700">
          4 High Risk Areas
        </Badge>
      </div>

      <div className="p-6 space-y-6">
        {/* Predictive Analytics Card */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <TrendingUp className="w-5 h-5" />
              📊 AI Risk Prediction
            </CardTitle>
            <CardDescription className="text-blue-600">
              Machine learning forecast: High Risk of Incident in Kaziranga National Park today (78% confidence)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predictions.map((pred, index) => (
                <div key={index} className="bg-white p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{pred.time}</span>
                    <Badge className={
                      pred.prediction === 'High Risk' ? 'bg-red-100 text-red-800' :
                      pred.prediction === 'Moderate Risk' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {pred.prediction}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium mb-1">{pred.area}</div>
                  <div className="text-xs text-muted-foreground mb-2">{pred.description}</div>
                  <div className="text-xs">Confidence: {pred.confidence}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Heatmap Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-600" />
                Tourist Density Heatmap
              </CardTitle>
              <CardDescription>
                Real-time tourist distribution and risk overlay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 mb-4">
                <ImageWithFallback
                  src={neIndiaMap}
                  alt="Northeast India risk zones heatmap"
                  className="w-full h-full object-cover rounded-md"
                />
                
                {/* Heatmap Overlays */}
                <div className="absolute top-16 left-20 w-16 h-16 bg-red-500/70 rounded-full blur-md" />
                <div className="absolute top-32 right-24 w-12 h-12 bg-orange-500/70 rounded-full blur-md" />
                <div className="absolute bottom-20 left-32 w-10 h-10 bg-yellow-500/70 rounded-full blur-md" />
                <div className="absolute bottom-16 right-16 w-8 h-8 bg-green-500/70 rounded-full blur-md" />

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-md shadow-sm">
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full" />
                      <span>High density (70+ tourists)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full" />
                      <span>Medium density (40-70)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full" />
                      <span>Low density (&lt;40)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Area Density Analysis</h4>
                {heatmapData.map((area, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{area.area}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-full rounded-full ${getDensityColor(area.density)}`}
                          style={{ width: `${area.density}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{area.density}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Zones List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                High Risk Zones
              </CardTitle>
              <CardDescription>
                Areas requiring enhanced monitoring and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {riskZones.map((zone) => (
                <Alert key={zone.id} className={getRiskColor(zone.level)}>
                  <MapPin className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{zone.name}</span>
                        <Badge className={getRiskColor(zone.level)}>
                          {zone.level.toUpperCase()} RISK
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{zone.touristCount} tourists</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span>{zone.incidents} incidents</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Risk Factors:</div>
                        <div className="flex flex-wrap gap-1">
                          {zone.factors.map((factor, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm">
                        <strong>Recommendation:</strong> {zone.recommendation}
                      </div>

                      <Button size="sm" variant="outline" className="w-full">
                        View Detailed Analysis
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Risk Analytics Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Analytics Dashboard</CardTitle>
            <CardDescription>
              Comprehensive risk assessment metrics and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">4</div>
                <div className="text-sm text-muted-foreground">High Risk Zones</div>
                <div className="text-xs text-green-600 mt-1">↓ 2 from yesterday</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">169</div>
                <div className="text-sm text-muted-foreground">Tourists in Risk Areas</div>
                <div className="text-xs text-red-600 mt-1">↑ 12 from yesterday</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-sm text-muted-foreground">Security Units Deployed</div>
                <div className="text-xs text-blue-600 mt-1">→ Same as yesterday</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Risk Mitigation Rate</div>
                <div className="text-xs text-green-600 mt-1">↑ 3% from yesterday</div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Weekly Risk Trends
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Monday</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-3/4 h-full bg-red-500 rounded-full" />
                      </div>
                      <span className="text-xs">High</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tuesday</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/2 h-full bg-orange-500 rounded-full" />
                      </div>
                      <span className="text-xs">Med</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Wednesday</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-1/3 h-full bg-green-500 rounded-full" />
                      </div>
                      <span className="text-xs">Low</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Today</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-full bg-red-500 rounded-full" />
                      </div>
                      <span className="text-xs font-medium">High</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Emergency Response Times</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Average Response Time</span>
                    <span className="font-medium">4.2 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fastest Response Today</span>
                    <span className="font-medium text-green-600">2.1 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Units Available</span>
                    <span className="font-medium">12/15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}