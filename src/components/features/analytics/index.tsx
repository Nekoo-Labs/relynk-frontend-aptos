"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Eye, MousePointer } from "lucide-react";

import { useState } from "react";

import { AnimatedDiv } from "@/components/ui/animated-wrapper";

// Mock analytics data
const mockAnalytics = {
  totalViews: 1247,
  totalClicks: 298,
  clickThroughRate: 23.9,
  topLinks: [
    {
      id: "1",
      title: "My Portfolio",
      url: "https://johndoe.dev",
      clicks: 142,
      views: 456,
      ctr: 31.1,
      icon: "🌐",
    },
    {
      id: "2",
      title: "Newsletter",
      url: "https://newsletter.johndoe.dev",
      clicks: 89,
      views: 234,
      ctr: 38.0,
      icon: "📧",
    },
    {
      id: "3",
      title: "GitHub",
      url: "https://github.com/johndoe",
      clicks: 67,
      views: 189,
      ctr: 35.4,
      icon: "💻",
    },
  ],
  recentActivity: [
    { date: "2024-01-15", views: 45, clicks: 12 },
    { date: "2024-01-14", views: 38, clicks: 9 },
    { date: "2024-01-13", views: 52, clicks: 15 },
    { date: "2024-01-12", views: 41, clicks: 8 },
    { date: "2024-01-11", views: 33, clicks: 7 },
    { date: "2024-01-10", views: 48, clicks: 11 },
    { date: "2024-01-09", views: 39, clicks: 10 },
  ],
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AnimatedDiv>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your profile performance and link engagement
          </p>
        </AnimatedDiv>
        <AnimatedDiv className="flex items-center gap-2">
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("90d")}
          >
            90 Days
          </Button>
        </AnimatedDiv>
      </div>

      {/* Overview Stats */}
      <AnimatedDiv className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Profile Views
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAnalytics.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5%
              </span>
              from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Link Clicks
            </CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAnalytics.totalClicks.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8.2%
              </span>
              from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Click-Through Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAnalytics.clickThroughRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.1%
              </span>
              from last period
            </p>
          </CardContent>
        </Card>
      </AnimatedDiv>

      {/* Top Performing Links */}
      <AnimatedDiv>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Links</CardTitle>
            <CardDescription>
              Your most clicked links in the selected time period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="flex flex-col gap-y-2 sm:flex-row items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="text-lg">{link.icon}</div>
                    <div className="flex-1 min-w-0 text-center sm:text-start">
                      <h4 className="font-medium truncate">{link.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{link.clicks}</div>
                      <div className="text-muted-foreground">Clicks</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{link.views}</div>
                      <div className="text-muted-foreground">Views</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary">{link.ctr}% CTR</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedDiv>

      {/* Recent Activity Chart */}
      <AnimatedDiv>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Daily views and clicks over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 divide-y-1">
              {mockAnalytics.recentActivity.map((day) => (
                <div
                  key={day.date}
                  className="flex py-4 flex-col sm:flex-row items-center justify-between"
                >
                  <div className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">{day.views} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{day.clicks} clicks</span>
                    </div>
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(day.clicks / day.views) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedDiv>

      {/* Export Options */}
      <AnimatedDiv>
        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>
              Download your analytics data for external analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">Export CSV</Button>
              <Button variant="outline">Export PDF Report</Button>
            </div>
          </CardContent>
        </Card>
      </AnimatedDiv>
    </div>
  );
}
