---
title: "[자료구조] Heap(힙) a.k.a Priority Queue(우선순위 큐)"
date: "2020-04-05"
layout: post
draft: false
path: "/posts/data_structures/heap_priority_queue/"
category: "Data Structure"
tags:
  - "Data Structure"
description: "Heap(힙) a.k.a Priority Queue(우선순위 큐)에 대해 알아보자."
---

# Heap(힙) a.k.a Priority Queue(우선순위 큐)

## Heap(힙)이란?

 - 데이터의 최대값(혹은 최소값)을 바로 찾을 수 있는 자료구조
 - 'Binary Tree(이진 트리)' 이되 **'Complete Binary Tree(완전 이진 트리)'** 이다.
 - Max Heap : 모든 부모 노드가 자식 노드보다 값이 커야한다.
 - Min Heap : 모든 부모 노드가 자식 노드보다 값이 작아야 한다.


## 왜 a.k.a Priority Queue(우선순위 큐)?

 - Priority Queue(우선순위 큐) : 일반적인 큐와 달리 들어간 순서에 상관없이 원소들의 우선순위에 따라 우선순위가 가장 높은 것이 가장 먼저 나오는 자료구조이다.
 - Priority Queue(우선순위 큐)의 성질에 의거하여 일반적인 linked list(연결 리스트)나 linear list(배열)보다는 성질이 유사한 heap을 사용하는 것이 유리하다.
 
 
## linked list 구현 vs. linear list(array) 구현
 
 - linear list 기반으로 힙을 구현하면 새로운 노드를 힙의 '마지막 위치'에 추가하는 것이 linear list(배열)에 비해 어렵다.
 - Complete Binary Tree 특성 상 linear list로 구현하는 것이 indexing(데이터 접근) 용이하다.
  

## Heap(힙) 구현
 1. **insert(data) = 삽입** : data를 heap의 마지막에 삽입 후 부모 노드와 대소 비교를 한다. 부모 노드보다 크면 (min heap : 작으면) data를 swap을 하고 부모 노드보다 작으면 (min heap : 크면) 현재 위치를 유지한다. root까지 반복한다.
 2. **withdraw() = 삭제** : root 노드의 data를 꺼내고, heap의 마지막 원소를 root로 올린 후 자식 노드와 대소 비교를 한다. 자식 노드보다 작으면 (혹은 min heap : 크면) swap을 하고 자식 노드보다 크면 (min heap : 작으면) 현재 위치를 유지한다. leaf node(단말 노드)까지 반복한다. 자식 노드가 2개일 시 두 노드의 대소 비교 후 큰 (min heap : 작은) 자식 노드를 대소 비교에 쓴다.
 3. **현재 위치 = idx  
    부모 노드 = idx / 2  
	왼쪽 자식 노드 = idx * 2  
	오른쪽 자식 노드 = idx * 2 + 1**
	


## Max Heap 구현 코드 (C++)
~~~c
#include <iostream>

template <typename T>
class Max_Heap {
private:
	T* data_arr;
	int size;
	int num_data;
	
public:
	Max_Heap(int size = 1000) : data_arr(new T[size]), size(size), num_data(0) {}
	
	~Max_Heap() {delete[] data_arr;}
	
	void insert(T data) {
		++num_data;
		
		if (num_data == 1) // no data before
			data_arr[1] = data;
		else { // at least one data exist
			data_arr[num_data] = data;
			int parent_idx = num_data / 2;
			int child_idx = num_data;
			
			do {
				if (data_arr[child_idx] < data_arr[parent_idx])
					break;
				else {
					std::swap(data_arr[child_idx], data_arr[parent_idx]);
					child_idx = parent_idx;
					parent_idx = child_idx / 2;
				}
			} while (parent_idx >= 1);
		}
	}
	
	T withdraw() {
		if (num_data == 0) // no data before
			return -1; // error code (up to data-type)
		else { // at least one data exist
			T return_data = data_arr[1];
			
			if (num_data == 1) // only root data exists
				data_arr[1] = 0;
			else {
				data_arr[1] = data_arr[num_data];
				data_arr[num_data] = 0;
				
				int idx = 1; // root
				
				while (data_arr[idx*2] != 0 || data_arr[idx*2+1] != 0) { // until leaf node
					if (data_arr[idx*2] == 0 || data_arr[idx*2+1] == 0) { // only one child exists
						if(data_arr[idx*2]) { // left child exists
							if (data_arr[idx] < data_arr[idx*2]) { // current node < left child
								std::swap(data_arr[idx], data_arr[idx*2]);
								idx *= 2;
							}
							else
								break;
						}
						else if(data_arr[idx*2+1]) { // right child exists
							if (data_arr[idx] < data_arr[idx*2+1]) { // current node < right child
								std::swap(data_arr[idx], data_arr[idx*2+1]);
								idx = idx * 2 + 1;
							} 
							else
								break;
						}
					}
					else { // both children exist
						if (data_arr[idx*2] > data_arr[idx*2+1] && data_arr[idx] < data_arr[idx*2]) { // left child > right child && current node < left child
							std::swap(data_arr[idx], data_arr[idx*2]);
							idx *= 2;
						}
						else if (data_arr[idx*2] < data_arr[idx*2+1] && data_arr[idx] < data_arr[idx*2+1]) { // left child < right child && current node < right child
							std::swap(data_arr[idx], data_arr[idx*2+1]);
							idx = idx * 2 + 1;
						}
						else
							break;
					}
				}
			}
			
			--num_data;
			
			return return_data;
		}
	}

	friend std::ostream& operator <<(std::ostream &out, Max_Heap &heap){
		T *temp = heap.data_arr;
		int power = 1;
		
		
		out << "──────────────────────────────────" << std::endl;
		
		for (int i = 1; i <= heap.num_data; ++i) {
			std::cout << temp[i];
			if (i == std::pow(2, power) - 1) {
				std::cout << '\n';
				++power;
			}
		}
		if (heap.num_data != std::pow(2, power-1) - 1)
			std::cout << '\n';
		
		out << "──────────────────────────────────" << std::endl;
		
		return out;
	}
};

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	Max_Heap<int> heap(1000);
	
	heap.insert(9);
	std::cout << heap << std::endl;
	
	heap.insert(5);
	std::cout << heap << std::endl;
	
	heap.insert(1);
	std::cout << heap << std::endl;
	
	std::cout << heap.withdraw() << std::endl;
	std::cout << heap << std::endl;
	std::cout << heap.withdraw() << std::endl;
	std::cout << heap << std::endl;
	std::cout << heap.withdraw() << std::endl;
	std::cout << heap << std::endl;

	return 0;
}
~~~


## Min Heap 구현 코드 (C++)
~~~c
#include <iostream>

template <typename T>
class Min_Heap {
private:
	T* data_arr;
	int size;
	int num_data;
	
public:
	Min_Heap(int size = 1000) : data_arr(new T[size]), size(size), num_data(0) {}
	
	~Min_Heap() {delete[] data_arr;}
	
	void insert(T data) {
		++num_data;
		
		if (num_data == 1) // no data before
			data_arr[1] = data;
		else { // at least one data exist
			data_arr[num_data] = data;
			int parent_idx = num_data / 2;
			int child_idx = num_data;
			
			do {
				if (data_arr[child_idx] > data_arr[parent_idx])
					break;
				else {
					std::swap(data_arr[child_idx], data_arr[parent_idx]);
					child_idx = parent_idx;
					parent_idx = child_idx / 2;
				}
			} while (parent_idx >= 1);
		}
	}
	
	T withdraw() {
		if (num_data == 0) // no data before
			return -1; // error code (up to data-type)
		else { // at least one data exist
			T return_data = data_arr[1];
			
			if (num_data == 1) // only root exists
				data_arr[1] = 0;
			else {
				data_arr[1] = data_arr[num_data];
				data_arr[num_data] = 0;
				
				int idx = 1; // root index
				
				while (data_arr[idx*2] != 0 || data_arr[idx*2+1] != 0) { // until leaf node
					if (data_arr[idx*2] == 0 || data_arr[idx*2+1] == 0) { // only one child exists
						if(data_arr[idx*2]) { // left child exists
							if (data_arr[idx] > data_arr[idx*2]) { // current node > left child
								std::swap(data_arr[idx], data_arr[idx*2]);
								idx *= 2;
							}
							else
								break;
						}
						else if(data_arr[idx*2+1]) { // right child exists
							if (data_arr[idx] < data_arr[idx*2+1]) { // current node > right child
								std::swap(data_arr[idx], data_arr[idx*2+1]);
								idx = idx * 2 + 1;
							} 
							else
								break;
						}
					}
					else { // both children exist
						if (data_arr[idx*2] < data_arr[idx*2+1] && data_arr[idx] > data_arr[idx*2]) { // left child < right child && current node > left child
							std::swap(data_arr[idx], data_arr[idx*2]);
							idx *= 2;
						}
						else if (data_arr[idx*2] > data_arr[idx*2+1] && data_arr[idx] > data_arr[idx*2+1]) { // left child > right child && current node > right child
							std::swap(data_arr[idx], data_arr[idx*2+1]);
							idx = idx * 2 + 1;
						}
						else
							break;
					}
				}
			}
			
			--num_data;
			
			return return_data;
		}
	}

	friend std::ostream& operator <<(std::ostream &out, Min_Heap &heap){
		T *temp = heap.data_arr;
		int power = 1;
		
		
		out << "──────────────────────────────────" << std::endl;
		
		for (int i = 1; i <= heap.num_data; ++i) {
			std::cout << temp[i];
			if (i == std::pow(2, power) - 1) {
				std::cout << '\n';
				++power;
			}
		}
		if (heap.num_data != std::pow(2, power-1) - 1)
			std::cout << '\n';
		
		out << "──────────────────────────────────" << std::endl;
		
		return out;
	}
};


int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	Min_Heap<int> heap(1000);
	
	heap.insert(9);
	std::cout << heap << std::endl;
	
	heap.insert(5);
	std::cout << heap << std::endl;
	
	heap.insert(1);
	std::cout << heap << std::endl;
	
	std::cout << heap.withdraw() << std::endl;
	std::cout << heap << std::endl;
	std::cout << heap.withdraw() << std::endl;
	std::cout << heap << std::endl;
	std::cout << heap.withdraw() << std::endl;
	std::cout << heap << std::endl;

	return 0;
}
~~~


### References
https://velog.io/@pa324/%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%ED%81%90-1xk1cw46t2  
https://www.crocus.co.kr/379  
https://medium.com/jiwon-bae/data-structure-%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%ED%81%90%EC%99%80-%ED%9E%99-c01947539d3d  
https://ohdumak.tistory.com/75
