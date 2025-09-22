import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  ArrowLeft, 
  Phone, 
  Users, 
  MapPin, 
  Calendar,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import neIndiaMap from 'figma:asset/711b37be16cea09cb3892059da8d795ba928081a.png';

interface Tourist {
  id: string;
  name: string;
  tripId: string;
  nationality: string;
  phone: string;
  status: 'safe' | 'warning' | 'sos';
  location: { lat: number; lng: number; name: string };
  lastSeen: string;
}

interface TouristProfileProps {
  tourist: Tourist;
  onBack: () => void;
}

export function TouristProfile({ tourist, onBack }: TouristProfileProps) {
  // Mock itinerary data for Northeast India
  const itinerary = [
    { date: '2025-01-15', location: 'Kamakhya Temple, Guwahati', stay: 'Hotel Dynasty, Guwahati', status: 'Completed' },
    { date: '2025-01-16', location: 'Kaziranga National Park', stay: 'Wild Grass Resort', status: 'Completed' },
    { date: '2025-01-17', location: 'Shillong, Meghalaya', stay: 'Hotel Polo Towers', status: 'Current' },
    { date: '2025-01-18', location: 'Mawlynnong Village', stay: 'Homestay Mawlynnong', status: 'Planned' },
    { date: '2025-01-19', location: 'Tawang Monastery', stay: 'Hotel Tawang Inn', status: 'Planned' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'sos': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCountryFlag = (nationality: string) => {
    const flags: { [key: string]: string } = {
      'India': '🇮🇳',
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'China': '🇨🇳',
      'UK': '🇬🇧',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Japan': '🇯🇵'
    };
    return flags[nationality] || '🏳️';
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
          <h1 className="text-2xl font-semibold">Tourist Profile</h1>
        </div>
        <Badge className={getStatusColor(tourist.status)}>
          {tourist.status.toUpperCase()}
        </Badge>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Tourist Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBlcnNvbnxlbnwxfHx8fDE3NTc4NjQwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt={`${tourist.name} profile photo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{tourist.name}</h3>
                  <p className="text-muted-foreground">{tourist.tripId}</p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nationality:</span>
                    <div className="flex items-center gap-2">
                      <span>{getCountryFlag(tourist.nationality)}</span>
                      <span>{tourist.nationality}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Emergency Contact:</span>
                    <span className="font-medium">{tourist.phone}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Seen:</span>
                    <span className="font-medium">{tourist.lastSeen}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(tourist.status)}>
                      {tourist.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t">
                  <Button className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Tourist
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Call Family
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Auto e-FIR
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Last Known Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Last Known Location
                </CardTitle>
                <CardDescription>
                  {tourist.location.name} - Lat: {tourist.location.lat}, Lng: {tourist.location.lng}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-100 rounded-md relative overflow-hidden">
                  <ImageWithFallback
                    src={neIndiaMap}
                    alt="Northeast India location map"
                    className="w-full h-full object-cover"
                  />
                  {/* Location marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Last updated: {tourist.lastSeen}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Travel Itinerary
                </CardTitle>
                <CardDescription>
                  Planned journey and accommodation details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Accommodation</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {itinerary.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.stay}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              item.status === 'Completed' ? 'default' :
                              item.status === 'Current' ? 'destructive' : 'secondary'
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity Log</CardTitle>
                <CardDescription>
                  System-generated activity timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tourist.status === 'sos' && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">SOS Alert Triggered</div>
                        <div className="text-sm text-muted-foreground">{tourist.location.name} - {tourist.lastSeen}</div>
                      </div>
                    </div>
                  )}
                  {tourist.status === 'warning' && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Entered Sensitive Zone</div>
                        <div className="text-sm text-muted-foreground">{tourist.location.name} - {tourist.lastSeen}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Check-in Confirmed</div>
                      <div className="text-sm text-muted-foreground">Kamakhya Temple visitor center - 2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Location Update</div>
                      <div className="text-sm text-muted-foreground">Moving from Guwahati to {tourist.location.name} - 4 hours ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}