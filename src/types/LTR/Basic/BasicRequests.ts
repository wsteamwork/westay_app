export interface BedRoomReq {
  number_bedroom: number;
  beds: Bed[];
  area: number;
}

export interface Bed {
  number_bed: number;
  size: number;
}
