---
title: "[백준] 2981 : 검문"
date: "2020-03-16"
layout: post
draft: false
path: "/posts/baekjoons/2981/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 2981번 문제 : 검문"
---

# 2981번 : 검문

👉 [문제 바로가기](https://www.acmicpc.net/problem/2981)



## 배경 지식
- `약수` : 어떤 정수를 나누어 떨어지게 하는 수
- `공약수` : 두 수, 혹은 그 이상의 여러 수의 공통인 약수
- `최대공약수` : 공약수 중 가장 큰 수

## 푼 방법
정답 비율이 21%로 꽤 어려운(?) 문제라고 볼 수 있다. 하지만, 정답 비율에 겁먹으면 초장부터 50%는 지고 들어가는 것이다. 자신감을 갖자.

수학적 사고 능력이 필요한 문제이다. 주어진 숫자 **num**이 오름차순이라 가정하고 나누는 숫자는 **M**, 나머지는 **R**일때 다음과 같이 표현할 수 있다.

num[0] = K[0] x M + R  
num[1] = K[1] x M + R  
num[2] = K[2] x M + R  
ㅤㅤㅤㅤㅤ፧

여기서 걸리적거리는 나머지를 없애보자. 나머지 R을 없애려면 **num[i]에서 num[i-1]을 빼주면 된다.**

num[1] - num[0] = M x (K[1] - K[0])  
num[2] - num[1] = M x (K[2] - K[1])  
ㅤㅤㅤㅤㅤㅤㅤㅤ፧

위 수식에서 중요한 포인트는, **나누는 수 M은 num[i] - num[i-1]의 약수라는 것**이다. 그러므로, **num[i] - num[i-1]들의 최대공약수를 구한 후 그 약수들을 구하면 나머지가 모두 같게 되는 모든 M을 찾을 수 있다.**

---

<본문제 풀이>

6 = K[0] x M + R  
34 = K[1] x M + R  
38 = K[2] x M + R

34 - 4 = M x (K[1] - K[0]) = 28  
38 - 34 = M x (K[2] - K[1]) = 4  

28과 4의 최대공약수 : 4

4의 약수 = 2, 4 (1은 문제 제약조건 상 제외)

## 내 정답 코드 (C++)
~~~c
#include <iostream>
#include <algorithm>
#include <vector>

int get_gcd(int a, int b) {
	return b ? get_gcd(b, a%b) : a;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, gcd_num = 0, temp_num;
	
	std::cin >> n;
	
	std::vector<int> num;
	std::vector<int> factor;
	
	for (int i = 0; i < n; ++i) { // 숫자 입력 받기
		std::cin >> temp_num;
		
		num.emplace_back(temp_num);
	}
	
	std::sort(num.begin(), num.end()); // 오름차순 정렬
	
	for (int i = 1; i < n; ++i) // num[i] - num[i-1]의 최대공약수 구하기
		gcd_num = get_gcd(num[i] - num[i-1], gcd_num);

	for (int i = 1; i*i <= gcd_num; ++i) { // 최대공약수의 약수구하기
		if (gcd_num % i == 0) {
			factor.emplace_back(i);
			if (gcd_num / i == i)
				continue;
			else
				factor.emplace_back(gcd_num/i);
		}
	}
	
	std::sort(factor.begin(), factor.end()); // 오름차순 정렬
	
	std::vector<int>::iterator iter = factor.begin() + 1; // 약수 '1' 제외
	
	for(; iter != factor.end(); ++iter)
		std::cout << *iter << " ";
    
    return 0;
}
~~~

### References
https://namu.wiki/w/%EC%B5%9C%EB%8C%80%EA%B3%B5%EC%95%BD%EC%88%98