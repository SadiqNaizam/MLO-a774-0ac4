import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'; // Assuming shadcn chart components
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Using recharts directly
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChartBig, PieChart as PieIcon } from 'lucide-react';

// Placeholder data for charts
const wasteByCategoryData = [
  { name: 'Produce', value: 400, fill: '#82ca9d' },
  { name: 'Dairy', value: 300, fill: '#8884d8' },
  { name: 'Bakery', value: 200, fill: '#ffc658' },
  { name: 'Meat', value: 150, fill: '#ff8042' },
  { name: 'Other', value: 100, fill: '#a4de6c' },
];

const consumptionTrendData = [
  { month: 'Jan', consumed: 30, wasted: 5 },
  { month: 'Feb', consumed: 45, wasted: 8 },
  { month: 'Mar', consumed: 38, wasted: 3 },
  { month: 'Apr', consumed: 52, wasted: 10 },
  { month: 'May', consumed: 40, wasted: 6 },
  { month: 'Jun', consumed: 60, wasted: 12 },
];

const AnalyticsPage = () => {
  console.log('AnalyticsPage loaded');
  const [timeRange, setTimeRange] = useState('last30days');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Food Analytics</h1>
              <p className="text-gray-600">Insights into your consumption and waste habits.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                  <SelectItem value="allTime">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>

          <ScrollArea className="h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Waste by Category Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieIcon className="mr-2 h-5 w-5 text-green-600" />
                    Waste by Category
                  </CardTitle>
                  <CardDescription>Breakdown of wasted items by food category for {timeRange.replace('last','Last ')}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={wasteByCategoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                          {wasteByCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Consumption vs. Waste Trend Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChartBig className="mr-2 h-5 w-5 text-green-600" />
                    Consumption vs. Waste Trend
                  </CardTitle>
                  <CardDescription>Monthly trend of consumed vs. wasted items for {timeRange.replace('last','Last ')}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={consumptionTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="consumed" fill="#82ca9d" name="Consumed" radius={[4, 4, 0, 0]}/>
                        <Bar dataKey="wasted" fill="#ff8042" name="Wasted" radius={[4, 4, 0, 0]}/>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* More cards for summary statistics */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Summary Statistics</CardTitle>
                  <CardDescription>Key metrics for {timeRange.replace('last','Last ')}.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Items Consumed</p>
                        <p className="text-2xl font-bold">150</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Total Items Wasted</p>
                        <p className="text-2xl font-bold">25</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Estimated Waste Cost</p>
                        <p className="text-2xl font-bold">$35.50</p>
                    </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;