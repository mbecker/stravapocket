import classNames from "classnames";
import { Activity } from "../../common/Strava";

interface StravaRowProps {
  activity: Activity;
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export default function StravaRow({ activity }: StravaRowProps) {
    const hasMap: boolean = activity.map.summary_polyline.length > 0;
  return (
    <tr key={`stravarow${activity.id}`}>
      <td className="col-type-text mr-2 inline-flex">
        <span
          className={classNames("label txt-base txt-mono", {
            "label label-success": hasMap,
          })}
          title="id"
        >
          {activity.type}
        </span>
      </td>

      <td className="col-type-email col-field-email">
        <div className="inline-flex">
          <span className="txt" title="name">
            {activity.name}
          </span>
          {/* <span className="label label-success">Verified</span> */}
        </div>
      </td>

      <td className="col-type-email col-field-email">
        <div className="inline-flex">
          <span className="txt" title="distance">
            {(activity.distance / 1000).toFixed(2)}km
          </span>
          {/* <span className="label label-warning">Verified</span> */}
        </div>
      </td>

      <td className="col-type-email col-field-email">
        <div className="inline-flex">
          <span className="txt" title="distance">
            {new Date(activity.moving_time * 1000)
              .toISOString()
              .substring(11, 16)}
            h
          </span>
          {/* <span className="label label-warning">Verified</span> */}
        </div>
      </td>

      <td className="col-type-email col-field-email">
        <div className="inline-flex">
          <span className="txt" title="startdate">
            {new Date(activity.start_date).toLocaleDateString(undefined, options)}
          </span>
          {/* <span className="label label-warning">Verified</span> */}
        </div>
      </td>

      <td className="col-type-action">
        <button
        disabled={!hasMap}
          type="button"
          className="hover:bg-pink-400 hover:text-white hover:border-pink-400 btn btn-sm btn-outline disabled:hidden"
        >
          <i className="ri-map-2-line" />
          <span className="txt">Create Map</span>
        </button>
        {/* <button type="button" className="btn btn-sm m-l-10 tbtn-edit">
          <i className="ri-profile-line" />
          <span className="txt">Edit profile</span>
        </button> */}
      </td>
    </tr>
  );
}
