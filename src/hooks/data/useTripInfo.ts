import http from 'api';
import { MemberInfo } from 'model/members';
import { TripInfo, DetailTripInfo, TripMinInfo, TripEditInfo } from 'model/trip';
import { useQuery } from 'react-query';

interface Response {
  message: string;
}

function postTrip(data: TripMinInfo) {
  return http.post<Response, TripMinInfo>('/trips', data);
}

function getTripLists() {
  return http.get<TripInfo[]>('/trips/all');
}

function getDetailTripInfo(tripId: string) {
  return http.get<DetailTripInfo>(`/trips?tripId=${tripId}`);
}

function editTripInfo(tripId: string, data: TripEditInfo) {
  return http.put<Response, TripEditInfo>(`/trips?tripId=${tripId}`, data);
}

function exitTrip(tripId: string) {
  return http.post<Response, string>(`/trips/exit?tripId=${tripId}`);
}

function deleteTrip(tripId: string) {
  return http.delete<Response>(`/trips?tripId=${tripId}`);
}

function getTripMembers(tripId: string) {
  return http.get<MemberInfo[]>(`/trips/members?tripId=${tripId}`);
}

export function usePostTrip(data: TripMinInfo) {
  return useQuery('postTrip', () => postTrip(data), { enabled: false });
}

export function useGetTripLists() {
  return useQuery('getAllTrips', getTripLists);
}

export function useGetDetailTripInfo(tripId: string) {
  return useQuery('getDetailTripInfo', () => getDetailTripInfo(tripId));
}

export function useEditTripInfo(tripId: string, data: TripEditInfo) {
  return useQuery('editTripInfo', () => editTripInfo(tripId, data), { enabled: false });
}

export function useExitTrip(tripId: string) {
  return useQuery('exitTrip', () => exitTrip(tripId), { enabled: false });
}

export function useDeleteTrip(tripId: string) {
  return useQuery('deleteTrip', () => deleteTrip(tripId));
}

export function useGetTripMembers(tripId: string) {
  return useQuery('getTripMembers', () => getTripMembers(tripId), { enabled: false });
}
