import React from 'react';
import { Metric } from '../types';
import Badge from './ui/Badge';
import Input from './ui/Input';
import Select from './ui/Select';

interface MetricsListProps {
  metrics: Metric[];
  onMetricChange?: (updatedMetric: Metric) => void;
  isEditable?: boolean;
}

const MetricsList: React.FC<MetricsListProps> = ({
  metrics,
  onMetricChange,
  isEditable = false
}) => {
  const handleChange = (metric: Metric, newValue: string | number) => {
    if (onMetricChange) {
      onMetricChange({
        ...metric,
        value: newValue
      });
    }
  };
  
  const getMetricBadgeVariant = (metricId: string): 'default' | 'primary' | 'secondary' | 'success' => {
    switch (metricId) {
      case 'tone':
        return 'primary';
      case 'wordCount':
        return 'secondary';
      case 'perspective':
        return 'success';
      default:
        return 'default';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="flex flex-col space-y-1">
          <div className="flex items-center">
            <Badge variant={getMetricBadgeVariant(metric.id)} size="sm">
              {metric.name}
            </Badge>
          </div>
          
          {isEditable ? (
            metric.type === 'select' && metric.options ? (
              <Select
                options={metric.options.map(opt => ({ value: opt, label: opt }))}
                value={metric.value.toString()}
                onChange={(e) => handleChange(metric, e.target.value)}
                className="text-sm"
              />
            ) : (
              <Input
                type={metric.type === 'number' ? 'number' : 'text'}
                value={metric.value.toString()}
                onChange={(e) => {
                  const value = metric.type === 'number' 
                    ? parseInt(e.target.value) 
                    : e.target.value;
                  handleChange(metric, value);
                }}
                className="text-sm"
              />
            )
          ) : (
            <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-700 font-medium">
              {metric.value.toString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsList;