export interface Athlete {
    id: number;
    firstname: string;
    lastname: string;
    profile_medium: string;
    profile: string;
    city: string;
    state: string;
    country: string;
    sex: string;
    friend: string;
    follower: string;
    premium: boolean;
    created_at: Date;
    updated_at: Date;
    approve_followers: boolean;
    badge_type_id: number;
}

export interface Map {
    id: string;
    polyline: string;
    summary_polyline: string;
}

export type Activities = Activity[];

export interface Activity {
    id: number;
    external_id: string;
    upload_id: number;
    athlete: Athlete;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    start_date: Date;
    start_date_local: Date;
    time_zone: string;
    start_latlng: number[];
    end_latlng: number[];
    location_city: string;
    location_state: string;
    location_country: string;
    achievement_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    map: Map;
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    flagged: boolean;
    gear_id: string;
    average_speed: number;
    max_speed: number;
    average_cadence: number;
    average_temp: number;
    average_watts: number;
    weighted_average_watts: number;
    kilojoules: number;
    device_watts: boolean;
    average_heartrate: number;
    max_heartrate: number;
    truncated: number;
    has_kudoed: boolean;
}