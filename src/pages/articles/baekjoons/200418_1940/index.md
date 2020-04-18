---
title: "[백준] 1940 : 주몽"
date: "2020-04-18"
layout: post
draft: false
path: "/posts/baekjoons/1940/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1940번 문제 : 주몽"
---

# 1940번 : 주몽

👉 [문제 바로가기](https://www.acmicpc.net/problem/1940)


## 배경 지식
 - `이진 탐색(Binary Search)` : 오름차순 혹은 내림차순(일반적으로 오름차순)으로 **정렬된 리스트**에서 특정한 값의 위치를 찾는 알고리즘; **중앙 값을 선택**하여 **대소 비교 후 범위를 갱신하고 특정 값을 찾을 때까지 계속 범위를 갱신하며 중간 값을 찾아나가는 알고리즘**


## 푼 방법
재료의 고유 값을 리스트(배열)에 저장하고 **오름차순 정렬**한 후, **리스트의 끝부터 처음까지 각각 M에서 뺀 값**을 **이진 탐색(Binary Search) 알고리즘을 사용하여 리스트에서 찾는다.** **존재할 경우** 갑옷을 만들 수 있으니 **갑옷 개수는 증가**하고 존재하지 않을 경우 갑옷을 만들 수 없으니 **갑옷 개수는 유지된다.**

이진 탐색의 범위를 계속해서 줄이는 이유는 **갑옷 개수 count의 중복을 피하기 위해서**이다.

이진 탐색 알고리즘은 직접 구현하지 않고 c++ 표준 라이브러리인 algorithm 라이브러리에 미리 작성된 함수를 사용하였다. 이진 탐색은 따로 정리해서 포스팅하고 그 포스트에서는 직접 구현해볼 예정이다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <algorithm>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int N, M, result = 0, nums[15000];
	
	std::cin >> N >> M;
	
	for (int i = 0; i < N; ++i)
		std::cin >> nums[i];
	
	std::sort(nums, nums+N);
	
	while (N != 0) {
		if (std::binary_search(nums, nums+N, M - nums[N]))
			++result;
		
		--N;
	}

	std::cout << result << std::endl;
	
	return 0;
}
~~~