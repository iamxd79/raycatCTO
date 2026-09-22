export const revalidate=60;
import {getRaycatData} from '../../../lib/stonkfun';
import {getAnalytics} from '../../../lib/stonkboard';
export async function GET(){const [official,analytics]=await Promise.all([getRaycatData(),getAnalytics()]);return Response.json({official,analytics},{headers:{'Cache-Control':'public, s-maxage=60, stale-while-revalidate=300'}});}
