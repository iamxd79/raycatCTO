import {getRaycatData} from '../../../lib/stonkfun';
import {getAnalytics} from '../../../lib/stonkboard';
export async function GET(){const [official,analytics]=await Promise.all([getRaycatData(),getAnalytics()]);return Response.json({official,analytics});}
