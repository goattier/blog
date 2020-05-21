---
title: "[백준] 1350 : 진짜 공간"
date: "2020-04-24"
layout: post
draft: false
path: "/posts/baekjoons/1350/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1350번 문제 : 진짜 공간"
---

# 1350번 : 진짜 공간

👉 [문제 바로가기](https://www.acmicpc.net/problem/1350)


## 배경 지식
 - `약간의 수학적 사고력`


## 푼 방법
이 문제의 정답 비율은 왜 낮은걸까? 내가 생각하기엔 문제가 쉬워 우습게 보고 문제 조건을 유심히 파악하지 못해서이지 않을까 싶다. (나도 그렇게 몇 번 틀렸다..)

클러스터의 크기보다 파일의 크기가 크면 **클러스터의 크기를 증가**시켜 **파일의 크기보다 크게(담을 수 있게)** 만들면 된다. **모든 파일의 개수**를 담을 수 있는 클러스터의 크기를 구하면 그 크기가 **디스크 공간**이 된다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>

typedef unsigned long long ull;

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, file_size[1000], cluster_size;
	ull result = 0;
	
	std::cin >> n;
	
	for (int i = 0; i < n; ++i)
		std::cin >> file_size[i];
	
	std::cin >> cluster_size;
	
	for (int i = 0; i < n; ++i) {
		if (file_size[i] == 0)
			continue;
		
		int cnt = file_size[i] % cluster_size == 0 && file_size[i] >= cluster_size ? file_size[i] / cluster_size : file_size[i] / cluster_size + 1;
		
		result += (cluster_size * cnt);
	}
	
	std::cout << result << std::endl;
	
	return 0;
}
~~~
