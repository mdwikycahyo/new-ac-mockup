"use client"

import type * as React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface ChartContainerProps {
  children: React.ReactNode
  data: any[]
  xAxisKey: string
  yAxisWidth?: number
  className?: string
}

export function ChartContainer({ children, data, xAxisKey, yAxisWidth = 30, className }: ChartContainerProps) {
  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis width={yAxisWidth} />
        {children}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <ChartContainer>{children}</ChartContainer>
}

export const ChartArea = Area
export const ChartAxisX = XAxis
export const ChartAxisY = YAxis
export const ChartGrid = CartesianGrid
export const ChartLine = AreaChart
export const ChartTooltipContent = () => {
  return null
}
