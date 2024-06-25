import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useSelector } from 'react-redux';
import { Image } from 'lucide-react';

const Surveys = () => {
  const totalSurveys = useSelector((state: any) => state.analytics.totalSurveys);
  const changeDuration = useSelector(
    (state: any) => state.analytics.changeDuration
  );
  const surveysChange = useSelector((state: any) => state.analytics.surveysChange);
  console.log('totalSurveys', totalSurveys);
  console.log('changeDuration', changeDuration);
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
          <Image size={20} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSurveys}</div>
          <p className="text-xs text-muted-foreground">
          {surveysChange} from last {changeDuration}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Surveys;
