---
title: "[백준] 11399 : ATM"
date: "2020-03-07"
layout: post
draft: false
path: "/posts/baekjoons/11399/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 11399 문제 : ATM"
---

# 11399번 : ATM

👉 [문제 바로가기](https://www.acmicpc.net/problem/11399)



## 배경 지식
- `Greedy Algorithm` : 매 순간 최적의 선택으로 목표 단계까지 계산해 나가는 알고리즘

`Greedy Algorithm`(이하 `GA`)와 `Dynamic Programming`(이하 `DP`)은 비슷해보이지만 다르다. `DP`는 **가능한 모든 경우를 계산하여 저장 & 사용**하고, `GA`는 **현 순간의 최적의 경우로 계산**을 해나간다.

DP와 GA는 각각 뚜렷한 장단점이 있기에, problem 유형마다 더 알맞은 알고리즘을 선택하여 쓰면 된다.




## 푼 방법
문제는 길어보이고 어려워보이지만, 해결 키 포인트를 잘 캐치해낸다면 그렇게 어려운 문제는 아니다.

줄을 선 순서대로 돈을 뽑고, 뒷 사람은 앞 사람이 다 뽑을 때까지 기다려야 하기에 각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 구하려면 **앞 사람 인출 시간 <= 뒷 사람 인출 시간**이어야 한다. 즉, **P 배열을 오름차순으로 정렬하고 배열의 앞부터 순차적으로 더해나가면 된다.**






## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <algorithm>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);

	int n;
	int p[1001];
	int sum = 0, result = 0;
	
	std::cin >> n;
	
	for (int i = 1; i <= n; ++i)
		std::cin >> p[i];
	
	std::sort(p+1, p+(n+1));
	
	for (int i = 1; i <= n; ++i) {
		sum += p[i];
		result += sum;
	}
	
	std::cout << result << std::endl;
    
	return 0;
}
~~~
