import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Truck, 
  Clock, 
  MapPin,
  Users,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RescueOperationsProps {
  onBack: () => void;
}

interface RescueOperation {
  id: string;
  touristName: string;
  location: string;
  sosTime: string;
  unitDispatched: string;
  status: 'ongoing' | 'rescued' | 'closed';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export function RescueOperations({ onBack }: RescueOperationsProps) {
  const [operations, setOperations] = useState<RescueOperation[]>([
    {
      id: '1',
      touristName: 'Sarah Johnson',
      location: 'Kaziranga National Park, Assam',
      sosTime: '2 hours ago',
      unitDispatched: 'Forest Patrol Unit-7',
      status: 'ongoing',
      priority: 'high',
      estimatedTime: '45 minutes'
    },
    {
      id: '2',
      touristName: 'David Chen',
      location: 'Tawang Monastery, Arunachal Pradesh',
      sosTime: '4 hours ago',
      unitDispatched: 'Mountain Rescue Team-3',
      status: 'rescued',
      priority: 'high',
      estimatedTime: 'Completed'
    },
    {
      id: '3',
      touristName: 'Emma Wilson',
      location: 'Mawlynnong Village, Meghalaya',
      sosTime: '6 hours ago',
      unitDispatched: 'Local Police Unit-12',
      status: 'closed',
      priority: 'medium',
      estimatedTime: 'Completed'
    },
    {
      id: '4',
      touristName: 'Raj Patel',
      location: 'Shillong Peak, Meghalaya',
      sosTime: '1 hour ago',
      unitDispatched: 'Tourist Safety Unit-5',
      status: 'ongoing',
      priority: 'medium',
      estimatedTime: '1.5 hours'
    }
  ]);

  const updateOperationStatus = (id: string, newStatus: string) => {
    setOperations(prev => prev.map(op => 
      op.id === id ? { ...op, status: newStatus as 'ongoing' | 'rescued' | 'closed' } : op
    ));
    toast.success(`Operation status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-orange-100 text-orange-800';
      case 'rescued': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeOperations = operations.filter(op => op.status === 'ongoing');
  const completedOperations = operations.filter(op => op.status !== 'ongoing');

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
            <Truck className="w-8 h-8 text-blue-600" />
            Rescue Operations Center
          </h1>
        </div>
        <Badge variant="outline" className="bg-orange-50 text-orange-700">
          {activeOperations.length} Active Operations
        </Badge>
      </div>

      <div className="p-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-orange-600">{activeOperations.length}</div>
                  <div className="text-sm text-muted-foreground">Ongoing</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-green-600">
                    {operations.filter(op => op.status === 'rescued').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Rescued</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-blue-600">12</div>
                  <div className="text-sm text-muted-foreground">Units Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-semibold text-purple-600">4.2</div>
                  <div className="text-sm text-muted-foreground">Avg Response (min)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Active Rescue Operations
            </CardTitle>
            <CardDescription>
              Real-time tracking of ongoing rescue missions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeOperations.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tourist</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>SOS Time</TableHead>
                    <TableHead>Unit Dispatched</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeOperations.map((operation) => (
                    <TableRow key={operation.id}>
                      <TableCell className="font-medium">{operation.touristName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {operation.location}
                        </div>
                      </TableCell>
                      <TableCell>{operation.sosTime}</TableCell>
                      <TableCell>{operation.unitDispatched}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(operation.priority)}>
                          {operation.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{operation.estimatedTime}</TableCell>
                      <TableCell>
                        <Select 
                          value={operation.status} 
                          onValueChange={(value) => updateOperationStatus(operation.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="rescued">Rescued</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No active rescue operations at the moment
              </div>
            )}
          </CardContent>
        </Card>

        {/* Operation Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Operation Timeline</CardTitle>
            <CardDescription>
              Chronological view of recent rescue activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">SOS Alert Received</div>
                  <div className="text-sm text-muted-foreground">
                    Sarah Johnson - Kaziranga National Park - 2 hours ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Rescue Unit Dispatched</div>
                  <div className="text-sm text-muted-foreground">
                    Forest Patrol Unit-7 deployed - 1h 45m ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Tourist Located & Rescued</div>
                  <div className="text-sm text-muted-foreground">
                    David Chen - Tawang Monastery - 4 hours ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">New SOS Alert</div>
                  <div className="text-sm text-muted-foreground">
                    Raj Patel - Shillong Peak - 1 hour ago
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full mt-1" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Operation Closed</div>
                  <div className="text-sm text-muted-foreground">
                    Emma Wilson - Case closed with tourist safety confirmed - 6 hours ago
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Operations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Completed Operations</CardTitle>
            <CardDescription>
              History of resolved rescue missions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tourist</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedOperations.map((operation) => (
                  <TableRow key={operation.id}>
                    <TableCell className="font-medium">{operation.touristName}</TableCell>
                    <TableCell>{operation.location}</TableCell>
                    <TableCell>{operation.sosTime}</TableCell>
                    <TableCell>{operation.unitDispatched}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(operation.status)}>
                        {operation.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}