import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function MissionLaxmiApp() {
  const [logs, setLogs] = useState([]);
  const [entries, setEntries] = useState([
    { empId: "", brand: "", activity: "", unitCount: "", startTime: "", endTime: "" }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const handleStart = (index) => {
    const updated = [...entries];
    updated[index].startTime = new Date().toLocaleTimeString();
    setEntries(updated);
  };

  const handleEnd = (index) => {
    const now = new Date().toLocaleTimeString();
    const updated = [...entries];
    updated[index].endTime = now;
    const duration = calculateDuration(updated[index].startTime, now);
    const log = {
      ...updated[index],
      duration,
    };
    setLogs([...logs, log]);
    updated[index] = { empId: "", brand: "", activity: "", unitCount: "", startTime: "", endTime: "" };
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { empId: "", brand: "", activity: "", unitCount: "", startTime: "", endTime: "" }]);
  };

  const calculateDuration = (start, end) => {
    const [sH, sM, sS] = start.split(":"),
      [eH, eM, eS] = end.split(":"),
      s = new Date(0, 0, 0, sH, sM, sS),
      e = new Date(0, 0, 0, eH, eM, eS);
    const diff = (e - s) / 60000;
    const mins = Math.floor(diff);
    const secs = Math.floor((diff % 1) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Mission Laxmi 2.0 – IPP Booster</h1>
      <Tabs defaultValue="entry">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="entry">Data Entry</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="entry">
          {entries.map((entry, index) => (
            <Card key={index} className="mb-6">
              <CardContent className="space-y-4 pt-4">
                <Input
                  placeholder="Employee ID"
                  value={entry.empId}
                  onChange={(e) => handleChange(index, "empId", e.target.value)}
                />
                <Input
                  placeholder="Brand"
                  value={entry.brand}
                  onChange={(e) => handleChange(index, "brand", e.target.value)}
                />
                <Input
                  placeholder="Activity"
                  value={entry.activity}
                  onChange={(e) => handleChange(index, "activity", e.target.value)}
                />
                <Input
                  placeholder="Unit Count (on task completion)"
                  type="number"
                  value={entry.unitCount}
                  onChange={(e) => handleChange(index, "unitCount", e.target.value)}
                />
                <div className="flex gap-4">
                  <Button onClick={() => handleStart(index)}>Start</Button>
                  <Button onClick={() => handleEnd(index)} disabled={!entry.startTime}>End</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {entry.startTime && `Start Time: ${entry.startTime}`}
                  {entry.endTime && ` | End Time: ${entry.endTime}`}
                </p>
              </CardContent>
            </Card>
          ))}
          <Button className="mt-2" onClick={addEntry}>+ Add Another Employee</Button>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardContent className="overflow-x-auto pt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Emp ID</th>
                    <th>Brand</th>
                    <th>Activity</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Units</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index} className="border-t">
                      <td>{log.empId}</td>
                      <td>{log.brand}</td>
                      <td>{log.activity}</td>
                      <td>{log.startTime}</td>
                      <td>{log.endTime}</td>
                      <td>{log.unitCount}</td>
                      <td>{log.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
